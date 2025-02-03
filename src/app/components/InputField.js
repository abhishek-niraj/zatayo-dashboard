'use client';

const InputField = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  isTextArea = false,
}) => {
  return (
    <div>
      <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
        {label}
      </label>
      {isTextArea ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className='w-full p-2 border rounded bg-gray-50 outline-none resize-none h-32' // Adjust height as needed
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className='w-full p-2 border rounded bg-gray-50 outline-none'
        />
      )}
    </div>
  );
};

export default InputField;
