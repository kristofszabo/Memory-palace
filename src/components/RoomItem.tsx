import { useState } from "react"
import SaveableTextEdit from "./SaveableTextedit"

interface RoomItemProps {
    saveChange: (newName: string, roomId: string)=> void,
    itemName: string,
    roomId: string,
}

export default function RoomItem({saveChange, itemName, roomId}: RoomItemProps){
        const [isUnderEdit, setIsUnderEdit] = useState(false)
    
        const handleSave = (newVal: string)=>{
            saveChange(newVal, roomId);
            setIsUnderEdit(false);
        }
    
        return <>
            {isUnderEdit ?
                <SaveableTextEdit saveMethod={handleSave} startingText={itemName} onCancel={()=>setIsUnderEdit(false)}></SaveableTextEdit>
                : <>{itemName} <button onClick={()=>setIsUnderEdit(true)}>Edit</button></>}
            
        </>
}