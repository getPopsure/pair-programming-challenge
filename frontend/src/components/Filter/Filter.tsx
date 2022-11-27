interface Props {
  onChange: (value: string) => void
}

export const Filter = (props: Props) => {
  return <div className='mb-2'>
    <label htmlFor='customer_name' title="Customer name filter" className="mr-2">Customer name filter</label>
    <input type='text' name='customer_name' id='customer_name' aria-label='Customer name filter' className="border-gray-900 border-2" onChange={(event) => props.onChange(event.target.value)} /> </div>;
};
