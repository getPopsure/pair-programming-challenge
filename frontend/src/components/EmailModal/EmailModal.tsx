import { useEffect, useReducer } from 'react';
import { Policy } from '../../features/Policies';

type EmailModalProps = {
  showEmailModal: boolean;
  setShowEmailModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPolicy: Policy | null;
};

type EmailModalState = {
  email: string;
  isEmailUpdateSuccessful: boolean;
  isEmailIUpdateError: boolean;
  emailUpdateError: string | null;
};

enum EmailModalActions {
  setEmail,
  setEmailUpdateResponse,
  setEmailUpdateError,
}

export function EmailModal({ showEmailModal, setShowEmailModal, selectedPolicy }: EmailModalProps) {
  const emailModalReducer = function (state: EmailModalState, action: { type: EmailModalActions; data: any }) {
    switch (action.type) {
      case EmailModalActions.setEmail:
        return { ...state, email: action.data };
      case EmailModalActions.setEmailUpdateResponse:
        return { ...state, isEmailUpdateSuccessful: true };
      case EmailModalActions.setEmailUpdateError:
        return { ...state, isEmailIUpdateError: true, emailUpdateError: action.data };
    }
  };

  const [state, dispatch] = useReducer(emailModalReducer, { email: '', isEmailUpdateSuccessful: false, isEmailIUpdateError: false, emailUpdateError: null });

  const onSubmitEmail = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    selectedPolicy &&
      fetch(`http://localhost:4000/customers/${selectedPolicy?.customer.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: state.email }),
      })
        .then((data) => dispatch({ type: EmailModalActions.setEmailUpdateResponse, data: {} }))
        .catch((error?: any) => dispatch({ type: EmailModalActions.setEmailUpdateError, data: error?.message }));
  };

  useEffect(() => {
    dispatch({ type: EmailModalActions.setEmail, data: '' });
    setShowEmailModal(false); //unmount
  }, [state.isEmailUpdateSuccessful, setShowEmailModal]);

  return !!showEmailModal ? (
    <div tabIndex={-1} className="backdrop-filter backdrop-blur-sm overflow-y-auto fixed top-0 right-0 left-0 z-50 p-4 w-full h-full h-modal">
      <div className="relative w-1/2 h-max top-1/3 left-1/3">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button onClick={() => setShowEmailModal(false)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal">
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </button>
          <div className="py-6 px-6 lg:px-8">
            <form className="space-y-6" action="#">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  value={state.email}
                  onChange={(event: React.FormEvent<HTMLInputElement>) => dispatch({ type: EmailModalActions.setEmail, data: event.currentTarget.value })}
                  type="email"
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <button type="submit" onClick={onSubmitEmail} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Save Email
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
