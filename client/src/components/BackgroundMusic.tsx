import {useState, useRef, useEffect} from "react";
import {Volume2, VolumeX} from "lucide-react";
import {Button} from "@/components/ui/button";
import {motion, AnimatePresence} from "framer-motion";

import musicUrl from "@/public/assets/audio/music1.mp3";

interface BackgroundMusicProps {
    playing?: boolean
}

export default function BackgroundMusic({playing}: BackgroundMusicProps) {
    const [isPlaying, setIsPlaying] = useState(!playing);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const togglePlay = () => {

        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };
    useEffect(() => {
        const handleUserInteraction = () => {
            if (audioRef.current) {
                audioRef.current.play()
                    .then(() => setIsPlaying(true)) // Cập nhật trạng thái sau khi phát thành công
                    .catch(err => console.error("Audio play failed:", err));
            }
            document.removeEventListener("click", handleUserInteraction);
        };

        document.addEventListener("click", handleUserInteraction, { once: true });

        return () => {
            document.removeEventListener("click", handleUserInteraction);
        };
    }, []);



    return (
        <div className="fixed bottom-4 left-1 z-50">
            <audio
                ref={audioRef}
                src={musicUrl}
                loop
                preload="auto"

            />
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
            >
                <Button
                    variant="outline"
                    size="icon"
                    className="bg-black/50 border-white/20 backdrop-blur-sm hover:bg-black/70"
                    onClick={togglePlay}
                >
                    <AnimatePresence mode="wait">
                        {isPlaying ? (
                            <motion.div
                                key="playing"
                                initial={{scale: 0}}
                                animate={{scale: 1}}
                                exit={{scale: 0}}
                            >
                                <Volume2 className="h-5 w-5 text-white"/>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="muted"
                                initial={{scale: 0}}
                                animate={{scale: 1}}
                                exit={{scale: 0}}
                            >
                                <VolumeX className="h-5 w-5 text-white"/>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Button>
            </motion.div>
        </div>
    );
}
