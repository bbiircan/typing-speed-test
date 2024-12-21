import { useCallback, useEffect, useRef, useState } from "react"

const useCountdownTimer = (seconds: number) => {
    const [timeLeft, setTimeLeft ] = useState(seconds)
    const intervalRef = useRef<number | null>(null)

    const startCountdown = useCallback(() => {
        console.log("starting countdown...")

        intervalRef.current = window.setInterval(() => {
            setTimeLeft((timeLeft) => timeLeft -1)
        }, 1000)
    }, [setTimeLeft])

    const resetCountdown = useCallback(() => {
        console.log("resetting countdown...")

        if(intervalRef.current){
            clearInterval(intervalRef.current)
        }

        setTimeLeft(seconds)
    }, [seconds])

    // when the countdown reaches 0, clear the countdown interval
    useEffect(() => {
        if (timeLeft === 0 && intervalRef.current !== null) {
            console.log("clearing timer...")

            clearInterval(intervalRef.current)
        }
    }, [timeLeft, intervalRef])

    return { timeLeft, startCountdown, resetCountdown }
}

export default useCountdownTimer