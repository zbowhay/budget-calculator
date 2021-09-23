import { Dialog } from "@mui/material";
import { useState, useEffect } from "react";

function EasterEgg() {
    const [/* code */, setCode] = useState<string[]>([]);
    const [open, setOpen] = useState(false);
    
    useEffect(()=> {
        const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

        function handleKeydown(e: KeyboardEvent) {
            setCode((prev) => {
                // does current code match expected code?
                const current = e.key;
                const expected = konamiCode[prev.length]

                // if matches, add.  otherwise, reset.
                const newCode = current === expected ? prev.concat([current]) : [];

                // if complete, rick roll
                if (newCode.join('') === konamiCode.join('')) {
                    setOpen(true);
                }

                return newCode;
            });
        }

        // mount
        document.addEventListener('keydown', handleKeydown)

        // unmount
        return () => {
            document.removeEventListener('keydown', handleKeydown)
        }
    }, []);

    const handleClose = () => {
        setCode([]);
        setOpen(false);
    }

    return (
        <>
            <Dialog open={open} onClickCapture={handleClose}>
                <iframe title="rickroll" allow="fullscreen" frameBorder="0" height="360" src="https://giphy.com/embed/uhYPkjP03h9RvVdazZ/video" width="480"></iframe>
            </Dialog>
        </>
    )
}

export default EasterEgg;