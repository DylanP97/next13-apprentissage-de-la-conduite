'use client';

import { useEffect } from "react";


interface ErrorStateProps {
  error: Error
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return ( 
    <div>
        <h1>Il y a eu une erreur!</h1>
    </div>
   );
}
 
export default ErrorState;



