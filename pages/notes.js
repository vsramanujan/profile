import Link from "next/link";
import styles from "../styles/Notes.module.css";
import {
  SearchIcon,
  PlusCircleIcon,
  PencilIcon,
  CheckIcon,
} from "@heroicons/react/solid";
import { useState } from "react";
import { motion, useViewportScroll } from "framer-motion";

import { prismaClient as prisma } from "../db";

export async function getServerSideProps() {
  const notes = await prisma.note.findMany();
  return {
    props: {
      initialNotes: notes.map((note) => ({
        ...note,
        createTime: note.createTime.toISOString(),
        updateTime: note.updateTime.toISOString(),
      })),
    },
  };
}

const TIME_DELAY = 0.2;
const Y_DISPLACEMENT = 75;

const BUTTON_STATES = {
  IDLE: "IDLE",
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
};

function isButtonClosed(buttonState) {
  return (
    buttonState === BUTTON_STATES.IDLE || buttonState === BUTTON_STATES.INACTIVE
  );
}

const colors = ["#ffcf7d", "#f0a177", "#b095f6", "#55cffa", "#e6ee96"];

export default function Notes({ initialNotes }) {
  const [buttonState, setButtonState] = useState(BUTTON_STATES.IDLE);
  const [notes, setNotes] = useState(initialNotes);

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Link href="/" passHref>
            <h3>Ram</h3>
          </Link>
        </div>
        <div className={styles.noteContainer}>
          <motion.button
            type="button"
            initial={false}
            animate={{
              rotate:
                buttonState === BUTTON_STATES.INACTIVE ||
                buttonState === BUTTON_STATES.IDLE
                  ? 0
                  : 226,
            }}
            className={styles.addNote}
            onClick={() => {
              if (
                buttonState === BUTTON_STATES.IDLE ||
                buttonState === BUTTON_STATES.INACTIVE
              ) {
                setButtonState(BUTTON_STATES.ACTIVE);
              } else {
                setButtonState(BUTTON_STATES.INACTIVE);
              }
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9, y: 20 }}
          >
            <PlusCircleIcon width="3.75rem" />
          </motion.button>
          <motion.div
            className={styles.noteSelectors}
            initial="false"
            animate={isButtonClosed(buttonState) ? "hidden" : "show"}
          >
            {colors.map((color, index) => (
              <motion.div
                key={color}
                onClick={async () => {
                  const { createdNote } = await fetch("/api/notes/create", {
                    method: "POST",
                    body: JSON.stringify({
                      bgColor: color,
                    }),
                  }).then((res) => res.json());
                  setNotes([...notes, createdNote]);
                }}
                style={{ backgroundColor: color }}
                className={styles.selector}
                whileTap={{ scale: 0.8 }}
                whileHover={{ scale: 1.2 }}
                variants={{
                  hidden: {
                    y: 0,
                    opacity: 0,
                    transition: {
                      duration: 0.2,
                    },
                  },
                  show: {
                    y: [
                      Math.max(10, Y_DISPLACEMENT * (index - 1)),
                      Y_DISPLACEMENT * (index + 1),
                    ],
                    opacity: 1,
                    transition: {
                      duration: 0.85,
                      delay: TIME_DELAY * index,
                    },
                  },
                }}
              />
            ))}
          </motion.div>
        </div>
      </nav>

      <svg
        style={{ display: "none" }}
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <defs>
          <filter id="gooey-effect">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 20 -9"
              result="gooey-effect"
            />
            <feComposite
              in="SourceGraphic"
              in2="gooey-effect"
              operator="atop"
            />
          </filter>
        </defs>
      </svg>

      <div className={styles.mainContainer}>
        <header className={styles.header}>
          <div className={styles.search}>
            <SearchIcon width="1.2rem" />
            <input type="text" placeholder="Search" />
          </div>
        </header>
        <main className={styles.main}>
          <h1>Notes</h1>

          <motion.div
            className={styles.noteParent}
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
          >
            {notes.map((note) => (
              <Note key={note.id} note={note} />
            ))}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

function Note({ note }) {
  const [noteText, setNoteText] = useState(note.note);
  const [editable, setEditable] = useState(false);

  return (
    <motion.div
      className={styles.note}
      style={{ backgroundColor: note.bgColor || "#ffcf7d" }}
      drag
      dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      variants={{
        hidden: { x: -100, rotate: -20, y: 100 },
        show: {
          x: 0,
          y: 0,
          rotate: Math.random() * -15 + Math.random() * 15 + 1,
        },
      }}
    >
      <textarea
        value={noteText}
        onChange={(e) => {
          setNoteText(e.currentTarget.value);
        }}
        disabled={!editable}
        placeholder="Start typing here..."
      />
      <div className={styles.noteMetadata}>
        <div>
          {new Date(note.updateTime).toLocaleDateString("en-US", {
            dateStyle: "medium",
          })}
        </div>
        <button>
          {editable ? (
            <CheckIcon
              width="1.7rem"
              onClick={() => {
                if (noteText !== note.note) {
                  fetch("/api/notes", {
                    method: "POST",
                    body: JSON.stringify({
                      note: noteText,
                      updateTime: new Date().toISOString(),
                      id: note.id,
                    }),
                  });
                }
                setEditable(false);
              }}
            />
          ) : (
            <PencilIcon width="1.7rem" onClick={() => setEditable(true)} />
          )}
        </button>
      </div>
    </motion.div>
  );
}
