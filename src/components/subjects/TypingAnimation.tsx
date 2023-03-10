import React, {useEffect, useState} from 'react';
import {motion} from "framer-motion";

// @ts-ignore
function TypingAnimation({textToBeWritten, className, displacementX="0",displacementY="0", delay=0}) {
    const [currentText, setCurrentText] = useState("");

    useEffect(
        () => {
            let text = textToBeWritten;

            let currentIndex = 0;
            const intervalId = setInterval(() => {
                setCurrentText(text.slice(0, currentIndex + 1));
                currentIndex++;
                if (currentIndex === text.length) {
                    clearInterval(intervalId);
                }
            }, 95);
            return () => clearInterval(intervalId);
        }, []
    )
    return (
        <motion.span
            className={className}
            initial={{ opacity: 0, x: displacementX, y: displacementY }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay }}
        >
            {currentText}
        </motion.span>

    );
}

export default TypingAnimation;