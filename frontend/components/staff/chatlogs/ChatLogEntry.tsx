import React, {FC} from "react";
import Link from "next/link"
import {colorCodes, formatDateToTime} from "../../../core/formatters";
import {MdArrowRight} from "react-icons/md"

interface ChatLogEntryProps {
    entry: ChatLogEntry,
    index: number,
    types: string[],
    users: string[],
    selectedLine?: number
}

const ChatLogEntry: FC<ChatLogEntryProps> = ({entry, index, types, selectedLine, users}) => {
    if (!users.includes(entry.executor.name) && !(users.length === 0)) {
        return <></>
    }

    if (!types.includes(entry.type)) {
        return <></>
    }

    return (
        <tr id={`${index}`}
            className={`flex space-x-1 items-start pt-1 pb-0.5 rounded hover:bg-shark-700 ${selectedLine === index && 'bg-shark-600 hover:bg-shark-600'} max-w-full`}>
            <td className="hidden lg:block w-8 text-right select-none">
                <Link href={`#L${index}`} passHref={true}>
                    <a className="font-mono text-shark-200 hover:text-gray-200 cursor-pointer">
                        {index}
                    </a>
                </Link>
            </td>
            {entry.type === "MESSAGE" ? (
                <>
                    <td className="flex space-x-1 select-none" style={{color: colorCodes[entry.executor.group.color ||"&7"]}}>
                        <span className="hidden xl:block capitalize">
                            [{entry.executor.group?.name}]
                        </span>
                        <span>
                        {entry.executor.name}
                        </span>
                    </td>
                    <td className="hidden lg:block mt-1"><MdArrowRight/></td>
                    <td className="overflow-x-hidden flex-1 text-ellipsis">
                        {entry.value}
                    </td>
                </>
            ) : (
                <>
                    <td className="flex space-x-1 text-gray-600 select-none">
                        <span className="hidden xl:block capitalize">
                            [{entry.executor.group?.name}]
                        </span>
                        <span>
                        {entry.executor.name}
                        </span>
                    </td>
                    <td className="hidden lg:block mt-1"><MdArrowRight className="text-gray-600" /></td>
                    <td className="overflow-x-hidden flex-1 italic text-gray-600 text-ellipsis">
                        {entry.value}
                    </td>
                </>
            )}
            <td className="hidden lg:block font-mono text-shark-200">
                {formatDateToTime(new Date(entry.executed), true)}
            </td>
        </tr>
    )
}

export default ChatLogEntry
