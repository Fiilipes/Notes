import React, { useEffect, useRef } from "react";
// @ts-ignore
function useDragger(id: string, left, top, myObject): void {

    const isClicked = useRef<boolean>(false);

    const coords = useRef<{
        startX: number,
        startY: number,
        lastX: number,
        lastY: number
    }>({
        startX: Number(left.split("px")[0]),
        startY: Number(top.split("px")[0]),
        lastX: Number(left.split("px")[0]),
        lastY: Number(top.split("px")[0])
    })

    useEffect(() => {

        const target = document.getElementById(id);
        if (!target) throw new Error("Element with given id doesn't exist");

        const container = target.parentElement;
        if (!container) throw new Error("target element must have a parent");



        const onMouseDown = (e: MouseEvent) => {
            isClicked.current = true;
            coords.current.startX = e.clientX;
            coords.current.startY = e.clientY;
            // set z-index to 100
            target.style.zIndex = "100";

        }

        const onMouseUp = (e: MouseEvent) => {
            isClicked.current = false;
            coords.current.lastX = target.offsetLeft;
            coords.current.lastY = target.offsetTop;
            target.style.zIndex = "90";
            let workspace = document.getElementById("mainContainer");

            // @ts-ignore
            Array.from(workspace.children).forEach((child) => {
                // @ts-ignore
                console.log( "🔥", child.offsetLeft,child.offsetTop)

                console.log("💀")
                console.log(myObject)

                // if the offset is +- 10px of the current element, make it green
                // @ts-ignore
                if (child.offsetLeft > coords.current.lastX - 50 && child.offsetLeft < coords.current.lastX + 50 && child.offsetTop > coords.current.lastY - 50 && child.offsetTop < coords.current.lastY + 50 && child.id !== id) {
                    // @ts-ignore
                    child.style.width = "140px";
                    // @ts-ignore
                    child.style.height = "60px";


                    // the object i drag id
                    let draggedObject = document.getElementById(id);
                    // the object i drag name
                    // @ts-ignore
                    let draggedObjectName = draggedObject.getAttribute("name");
                    console.log(draggedObjectName)
                    // the object on which i drop id
                    let droppedObject = child;
                    // the object on which i drop name
                    let droppedObjectName = droppedObject.getAttribute("name");
                    console.log(droppedObjectName)
                    // if ((draggedObjectName === "AHOJKY Fešáku" && droppedObjectName === "JESsus chrissp") || (draggedObjectName === "JESsus chrissp" && droppedObjectName === "AHOJKY Fešáku")) {
                    //     // make them disappear
                    //     draggedObject.style.display = "none";
                    //     droppedObject.style.display = "none";
                    // }

                    // if draggedObjectName and droppedObjectName are in the same object in myObject (array with objects), make them disappear
                    myObject.forEach((object: { question: string | null; answer: string | null; }) => {
                        if ((object.question === draggedObjectName && object.answer === droppedObjectName) || (object.question === droppedObjectName && object.answer === draggedObjectName)) {
                            // @ts-ignore
                            draggedObject.style.display = "none";
                            // @ts-ignore
                            droppedObject.style.display = "none";
                        } else {
                            // make them move on x axis by 100px from their current position

                            //random numbe

                            // @ts-ignore
                            draggedObject.style.left = `${draggedObject.offsetLeft + 20}px`;
                            // @ts-ignore
                            draggedObject.style.top = `${draggedObject.offsetTop + 20}px`;

                            // @ts-ignore
                            coords.current.lastX = draggedObject.offsetLeft
                            // @ts-ignore
                            coords.current.lastY = draggedObject.offsetTop

                        }
                    })




                } else {
                    // @ts-ignore
                    child.style.width = "120px";
                    // @ts-ignore
                    child.style.height = "50px";
                }


            })

        }

        const onMouseMove = (e: MouseEvent) => {
            if (!isClicked.current) return;

            const nextX = e.clientX - coords.current.startX + coords.current.lastX;
            const nextY = e.clientY - coords.current.startY + coords.current.lastY;

            console.log(nextX, nextY)



            let workspace = document.getElementById("mainContainer");

            // @ts-ignore
            console.log(workspace.children)

            // @ts-ignore
            Array.from(workspace.children).forEach((child) => {
                // @ts-ignore
                console.log( "🔥", child.offsetLeft,child.offsetTop)

                // if the offset is +- 10px of the current element, make it green
                // @ts-ignore
                if (child.offsetLeft > nextX - 50 && child.offsetLeft < nextX + 50 && child.offsetTop > nextY - 50 && child.offsetTop < nextY + 50 && child.id !== id) {
                    // @ts-ignore
                    child.style.width = "140px";
                    // @ts-ignore
                    child.style.height = "60px";

                } else {
                    // @ts-ignore
                    child.style.width = "120px";
                    // @ts-ignore
                    child.style.height = "50px";
                }


            })


            target.style.top = `${nextY}px`;
            target.style.left = `${nextX}px`;
        }

        target.addEventListener('mousedown', onMouseDown);
        target.addEventListener('mouseup', onMouseUp);
        container.addEventListener('mousemove', onMouseMove);
        container.addEventListener('mouseleave', onMouseUp);

    }, [id])

}

export default useDragger;


