import { useState, ChangeEvent, FormEvent } from 'react'
import styles from './searchInput.module.css'
interface SearchInputProps {
    onChange: (value: string) => void
}

export function SearchInput({onChange}: SearchInputProps) {
    const [inputValue, setInputValue] = useState('')
    const handleChange = (e: ChangeEvent<HTMLInputElement>)=> {
        const value = e.target.value
        setInputValue(value)
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        onChange(inputValue)
    }

    return <form name="search" onSubmit={handleSubmit}>
        <label htmlFor="search-policy" className={styles.label}>Search by name</label>
        <input className={`rounded-md border-2 ${styles.input}`} id="search-policy" data-testid="search-policy" type="search" onChange={handleChange} placeholder="Search by name" />
        <button className={styles.button} type="submit">Search</button>
    </form>
}
