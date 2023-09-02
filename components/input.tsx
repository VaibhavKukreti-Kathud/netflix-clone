import React from 'react';  
import { FaAirbnb } from 'react-icons/fa'; 

interface InputProps {
    id: string;
    label: string;
    value: string;
    onChange: any;
    type?: string;
}

const Input:React.FC<InputProps> = ({
    id,
    label,
    value,
    onChange,
    type
}) => {
    return (
        <div className="relative">
            <input
                id={id}
                minLength={6}
                type={type}
                value={value}
                onChange={onChange}
                className="
                    block
                    rounded-md
                    px-6
                    pt-3
                    pb-1
                    w-full
                    text-md
                    h-14
                    text-white
                    bg-white/[0.1]
                    focus:bg-white/[0.2]
                    duration-150
                    ease-out
                    appearance-none
                    focus:outline-none
                    focus:ring-0
                    peer"
                placeholder=" "
            />
            <label 
            className="
            absolute
            text-md
            text-white/[0.5]
            duration-150
            transform
            -translate-y-3
            scale-75
            top-4
            z-10
            origin-[0]
            left-6
            peer-placeholder-shown:scale-100
            peer-placeholder-shown:translate-y-0
            peer-focus:scale-75
            peer-focus:-translate-y-4
            "
            htmlFor= {id}>
                {label}
            </label>
        </div>
    )
}

export default Input