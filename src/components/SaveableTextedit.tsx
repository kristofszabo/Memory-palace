import React, {useRef, useEffect} from "react"

interface SaveableTextEditProps{
    saveMethod:(newVal: string)=>void,
    startingText: string,
    onCancel?: ()=>void
}

export default function SaveableTextEdit({saveMethod, startingText, onCancel}: SaveableTextEditProps){
    const inputRef = useRef<HTMLInputElement>(null)

    const handleSave = ()=>{
        if(inputRef.current!==null)
            saveMethod(inputRef.current.value)
    }

    useEffect(() => {
        if (inputRef.current) {
          inputRef.current.select();
        }
      }, []);

    return <>
        <input autoFocus={true} ref={inputRef} type="text" defaultValue={startingText} id="chaningText"></input>
        <button onClick={handleSave}>Save</button>
        {onCancel !== null && <button onClick={onCancel}>Cancel</button>}
    </>
}