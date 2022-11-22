import { useState } from "react";

interface SearchComponentProps {
    onChange: (query: string) => void;
}
export const SearchComponent: React.FC<SearchComponentProps> = ({onChange}) => {
    const [query, setQuery] = useState("");
    // FIXME to handle it with types
    const handleKeyDown = (e: any) => {
        console.log('e.key', e.key)
        if (e.key === "Enter") {
            const value = e.target.value;
            console.log('Enter was pressed!!! for:', value)
            onChange(query);
        }
    }
    const handleChange = (e: any) => {
        const value = e.target.value;
        if (query !== value) {
            setQuery(value);
        }
    }
    return <input value={query} onKeyDown={handleKeyDown} onChange={handleChange} />
}