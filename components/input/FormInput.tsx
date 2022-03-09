import { FC } from 'react';

interface Props {
  name: string;
  register?: any;
  error?: string | undefined;
  [inputProps: string]: any;
}

const FormInput: FC<Props> = ({ name, register, error, ...inputProps }) => {
  let borderFocus = 'border-gray-400 focus:border-sky-500 focus:ring-sky-500';

  if (error) {
    borderFocus = 'border-red-500 ring-red-500';
  }

  return (
    <>
      <input
        id={name}
        className={`py-2 px-3 appearance-none border focus:outline-none ${borderFocus} focus:ring-1 rounded-md`}
        {...(register && register(name))}
        {...inputProps}
      />
      <span className='text-red-500'>{error}</span>
    </>
  );
};

export default FormInput;
