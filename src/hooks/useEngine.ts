import { useCallback, useEffect, useState } from "react"
import useWords from "./useWords"
import useCountdownTimer from "./useCountdownTimer";
import useTypings from "./useTypings";
import { countErrors } from "../utils/helpers";

export type State = "start" | "run" | "finish"

const NUMBER_OF_WORDS = 30
const COUNTDOWN_SECONDS = 30;

const useEngine = () => {
    const [state, setState] = useState<State>("start")
    const { words, updateWords } = useWords(NUMBER_OF_WORDS)
    const { timeLeft, startCountdown, resetCountdown } = useCountdownTimer(COUNTDOWN_SECONDS)
    const { typed, cursor, clearTyped, resetTotalTyped, totalTyped } = useTypings(state !== "finish")

    const [errors, setErrors] = useState(0)

    const isStarting = state === "start" && cursor > 0
    const areWordsFinished = cursor === words.length

    const sumErrors = useCallback(() => {
        const wordsReached = words.substring(0, cursor)
        setErrors((prevErrors) => prevErrors + countErrors(typed, wordsReached))
    }, [typed, words, cursor])

    // as soon the user starts typing the first letter, we start
    useEffect(() => {
        if (isStarting) {
            setState("run")
            startCountdown()
        }
    }, [isStarting, startCountdown, cursor])

    // when the time is up, we've finished
    useEffect(() => {
        if (!timeLeft) {
            console.log("time is up...");
            setState("finish");
            sumErrors();
        }
    }, [timeLeft, sumErrors])

    /**
     * when the current words are all filled up,
     * we generate and show another set of words
     */
    useEffect(() => {
        if (areWordsFinished) {
            console.log("words are finished...");
            sumErrors();
            updateWords();
            clearTyped();
        }
    }, [
        cursor,
        words,
        clearTyped,
        typed,
        areWordsFinished,
        updateWords,
        sumErrors
    ])

    const restart = useCallback(() => {
        console.log("restarting...")
        resetCountdown();
        resetTotalTyped();
        setState("start");
        setErrors(0);
        updateWords();
        clearTyped();
    }, [clearTyped, updateWords, resetCountdown, resetTotalTyped])

    return { state, words, timeLeft, typed, errors, totalTyped, restart }
}

export default useEngine