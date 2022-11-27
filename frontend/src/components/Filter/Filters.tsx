import { PolicyStatus } from '../../features/Policies';

interface Props {
  onNameChange: (value: string) => void;
  onPolicyStatusChange: (value: PolicyStatus) => void;
  policyStatuses: PolicyStatus[];
  selectedPolicyStatus: PolicyStatus | "";
}

export const Filters = (props: Props) => {
  return <div className='mb-2'>
    <label htmlFor='customer_name' title='Customer name filter' className='mr-2'>Name</label>
    <input type='text' name='customer_name' id='customer_name' aria-label='Customer name filter'
           className='border-gray-900 border-2 mr-2' onChange={(event) => props.onNameChange(event.target.value)} />

    {props.policyStatuses.length > 0 && (
      <>
        <label htmlFor='policy_status' title='Policy status' className='mr-2'>Policy status</label>
        <select onChange={(event) => props.onPolicyStatusChange(event.target.value as PolicyStatus)}>
          <option value='' {...(!props.selectedPolicyStatus ? {selected: true} : {})}>Any</option>
          {props.policyStatuses.map(status => <option key={status} {...(props.selectedPolicyStatus === status ? {selected: true} : {})} value={status}>{status}</option>)}
        </select>
      </>
    )}
  </div>;
};
