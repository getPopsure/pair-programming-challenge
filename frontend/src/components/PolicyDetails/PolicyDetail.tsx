import { Policy } from '../../features/Policies/Policies.model';

interface PolicyDetailProps {
  showDetailsModal: boolean;
  setShowDetailsModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPolicy: Policy | null;
}

export const PolicyDetails = ({ showDetailsModal, setShowDetailsModal, selectedPolicy }: PolicyDetailProps) => {
  return !!showDetailsModal ? (
    <div tabIndex={-1} className="backdrop-filter backdrop-blur-sm overflow-y-auto fixed top-0 right-0 left-0 z-50 p-4 w-full h-full h-modal">
      <div className="relative w-1/2 h-max top-1/3 left-1/3">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button onClick={() => setShowDetailsModal(false)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal">
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </button>
          <div className="py-6 px-6 lg:px-8">
            {selectedPolicy && (
              <div>
                <p id="customer-name-details">Customer Name: {selectedPolicy.customer.firstName + ' ' + selectedPolicy.customer.lastName}</p>
                <p id="provider-details">Provider: {selectedPolicy.provider}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};
