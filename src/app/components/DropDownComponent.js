'use client';

const DropdownField = ({ label, value, onChange, options }) => {
  return (
    <div>
      <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
        {label}
      </label>
      <select
        className='w-full p-2 border rounded bg-gray-50 outline-none'
        value={value}
        onChange={onChange}
      >
        <option value='' disabled>
          Select an option
        </option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled} // Disable the option if `disabled` is true
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownField;
