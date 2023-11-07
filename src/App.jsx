import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/dist/Draggable";
import "./main.scss";
import background from "./assets/background.jpg";

function App() {
    const cardRef = useRef(null);
    const backgroundRef = useRef(null);
    const [showContent, setShowContent] = useState(true);

    useEffect(() => {
        gsap.registerPlugin(Draggable);

        Draggable.create(cardRef.current, {
            onDrag: function () {
                const backgroundPosition = `calc(50% - ${this.x}px) calc(50% - ${this.y}px)`;
                backgroundRef.current.style.backgroundPosition = backgroundPosition;
            },
            onDragEnd: function () {
                gsap.to(cardRef.current, {
                    y: 0,
                    x: 0,
                    duration: 1,
                    ease: "expo.inOut",
                    onUpdate: function () {
                        const target = this.targets()[0];
                        const x = gsap.getProperty(target, "x");
                        const y = gsap.getProperty(target, "y");
                        const backgroundPosition = `calc(50% - ${x}px) calc(50% - ${y}px)`;
                        backgroundRef.current.style.backgroundPosition = backgroundPosition;
                    },
                });
            },
        });
    }, []);

    return (
        <main>
            <aside>
                <label>
                    <input
                        type="checkbox"
                        checked={showContent}
                        onChange={() => {
                            setShowContent(!showContent);
                        }}
                    />
                    Show Content
                </label>
            </aside>
            <article ref={cardRef} className="card">
                <div ref={backgroundRef} className="background" style={{ backgroundImage: `url(${background})` }}></div>
                <div className="blur">
                    {showContent && (
                        <>
                            <h1>Gradient Blur</h1>
                            <p>This effect can be created with CSS using a combination of backdrop-filter and mask-image.</p>
                        </>
                    )}
                </div>
            </article>
        </main>
    );
}

export default App;
