"use client"
export default function TableRow({
    number,
    name,
    age
}) {
    return (
        <tr>
            <th>{number}</th>
            <td>{name}</td>
            <td>{age}</td>
        </tr>
    )
}