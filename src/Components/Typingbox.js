import React, { useState, useRef, useEffect, useMemo, createRef } from "react";
import { generate } from "random-words";
import UpperMenu from "./UpperMenu";
import { useTestMode } from "../Context/TestModeContext";
import Stats from "./Stats";

const Typingbox = () => {
    
    const {testTime} = useTestMode();
    const [currWordIndex, setCurrWordIndex] = useState(0);
    const [currCharIndex, setCurrCharIndex] = useState(0);
    const [countDown, setCountDown] = useState(testTime);
    const [testStart, setTestStart] = useState(false);
    const [testEnd, setTestEnd] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [correctChars, setCorrectChars] = useState(0);
    const [incorrectChars, setIncorrectChars] = useState(0);
    const [missedChars, setMissedChars] = useState(0);
    const [extraChars, setExtraChars] = useState(0);
    const [correctWords, setCorrectWords] = useState(0);
    const inputRef = useRef(null);

    // console.log(inputRef);

    const [wordsArray, setWordsArray] = useState(() => {
        return generate(50);
    })

   

    const wordsSpanRef = useMemo(() => {
        return Array(wordsArray.length).fill(0).map(i => createRef(null));
    }, [wordsArray]);

    // console.log(wordsSpanRef);

    const startTimer = () => {

        const intervalId = setInterval(timer, 1000);
        setIntervalId(intervalId);

        function timer() {
            setCountDown((latestCountDown) => {
                if (latestCountDown === 1) {
                    setTestEnd(true);
                    clearInterval(intervalId);
                    return 0;
                }
                return latestCountDown - 1;
            });
        }
    }

    const resetTest = () => {
        clearInterval(intervalId);
        setCountDown(testTime);
        setCurrWordIndex(0);
        setCurrCharIndex(0);
        setTestStart(false);
        setTestEnd(false);
        setWordsArray(generate(50));
        resetWordSpanRefClassname();
        focusInput();
    }

    const resetWordSpanRefClassname = () => {
        wordsSpanRef.map(i => {
            Array.from(i.current.childNodes).map(j => {
                j.className = "";
            });
        });
        wordsSpanRef[0].current.childNodes[0].className = "current";
    }

    const handleUserInput = (e) => {
        // console.log(e);

        if (!testStart) {
            startTimer();
            setTestStart(true);
        }

        const allCurrChars = wordsSpanRef[currWordIndex].current.childNodes;

        // console.log(allCurrChars[0].innerText);

        if (e.keyCode === 32) {
            // logic for space

            const correctCharsInWord = wordsSpanRef[currWordIndex].current.querySelectorAll(".correct");

            if(correctCharsInWord.length === allCurrChars.length){
                setCorrectWords(correctWords+1);
            }

            if (allCurrChars.length <= currCharIndex) {
                // remove cursor from last place of word
                allCurrChars[currCharIndex - 1].classList.remove("current-right");
            }
            else {
                // remove cursor from between of word
                setMissedChars(missedChars + (allCurrChars.length - currCharIndex));
                allCurrChars[currCharIndex].classList.remove("current");
            }

            wordsSpanRef[currWordIndex + 1].current.childNodes[0].className = "current";

            setCurrWordIndex(currWordIndex + 1);
            setCurrCharIndex(0);
            return;
        }

        if (e.keyCode === 8) {
            // logic for backspace

            if (currCharIndex !== 0) {
                if (allCurrChars.length === currCharIndex) {
                    if (allCurrChars[currCharIndex - 1].className.includes("extra")) {
                        allCurrChars[currCharIndex - 1].remove();
                        allCurrChars[currCharIndex - 2].className += " current-right";
                    }
                    else {
                        allCurrChars[currCharIndex - 1].className = "current";
                    }

                    setCurrCharIndex(currCharIndex - 1);
                    return;
                }

                allCurrChars[currCharIndex].className = " ";
                allCurrChars[currCharIndex - 1].className = "current";
                setCurrCharIndex(currCharIndex - 1);
            }
            return;
        }

        if (currCharIndex === allCurrChars.length) {
            let newSpan = document.createElement("span");
            newSpan.innerText = e.key;
            newSpan.className = "incorrect extra current-right";
            allCurrChars[currCharIndex - 1].classList.remove("current-right");
            wordsSpanRef[currWordIndex].current.append(newSpan);
            setCurrCharIndex(currCharIndex + 1);
            setExtraChars(extraChars+1);
            return;
        }

        if (e.key === allCurrChars[currCharIndex].innerText) {
            allCurrChars[currCharIndex].className = "correct";
            setCorrectChars(correctChars+1);
        }
        else {
            allCurrChars[currCharIndex].className = "incorrect";
            setIncorrectChars(incorrectChars+1);
        }

        if (currCharIndex + 1 === allCurrChars.length) {
            allCurrChars[currCharIndex].className += " current-right";
        }
        else {
            allCurrChars[currCharIndex + 1].className = "current";
        }

        setCurrCharIndex(currCharIndex + 1);
    }

    const focusInput = () => {
        inputRef.current.focus();
    }

    const calculateWPM = () => {
        return Math.round((correctChars/5) / (testTime/60));
    }

    const calculateAcc = () => {
        return Math.round((correctWords/currCharIndex)*100);
    }

    useEffect(() => {
        resetTest();
    }, [testTime]);

    useEffect(() => {
        focusInput();
        wordsSpanRef[0].current.childNodes[0].className = "current";
    }, []);

    return (
        <div>
            <UpperMenu countDown={countDown} />
            {(testEnd) ? (<Stats 
                 wpm={calculateWPM()} 
                 accuracy={calculateAcc()} 
                 correctChars={correctChars}
                 incorrectChars={calculateAcc}
                 missedChars={missedChars}
                 extraChars={extraChars}
            /> 
            ) : (<div className="type-box" onClick={focusInput}>
                <div className="words">
                    {
                        wordsArray.map((word, index) => (
                            <span className="word" ref={wordsSpanRef[index]}>
                                {
                                    word.split('').map(char => (
                                        <span>{char}</span>
                                    ))
                                }
                            </span>
                        ))
                    }
                </div>
            </div>
            )}
            <input
                className="hidden-input"
                type="text"
                ref={inputRef}
                onKeyDown={handleUserInput}
            />
        </div>
    )
}

export default Typingbox;