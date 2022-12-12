import { PolicyStatus } from '../../features/Policies';

interface Props {
  onNameChange: (value: string) => void;
  onPolicyStatusChange: (value: PolicyStatus) => void;

  onReset: () => void;
  policyStatuses: PolicyStatus[];
  selectedPolicyStatus: PolicyStatus | undefined;
  nameFilterValue: string;
}

export const Filters = (props: Props) => {
  return <div className='mb-2'>
    <label htmlFor='customer_name' title='Customer name filter' className='mr-2'>Name</label>
    <input type='text' name='customer_name' id='customer_name' data-testid="customer_name" aria-label='Customer name filter'
           className='border-gray-900 border-2 mr-2' onChange={(event) => props.onNameChange(event.target.value)} value={props.nameFilterValue} />

    {props.policyStatuses.length > 0 && (
      <>
        <label htmlFor='policy_status' title='Policy status' className='mr-2'>Policy status</label>
        <select className="mr-2" defaultValue={props?.selectedPolicyStatus ?? ""} onChange={(event) => props.onPolicyStatusChange(event.target.value as PolicyStatus)}>
          <option value=''>Any</option>
          {props.policyStatuses.map(status => <option key={status} value={status}>{status}</option>)}
        </select>
        <button onClick={props.onReset}>Reset</button>
      </>
    )}
  </div>;
};
