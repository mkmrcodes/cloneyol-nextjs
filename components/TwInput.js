const TwInput = (props) => {
  const { label, name, ...rest } = props;
  return (
    <div className={'w-full flex flex-col p-2'} role='group'>
      <label className={'mb-0'} htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        className={'px-3 py-2 bg-[#272e33] border border-white rounded-lg '}
        {...rest}
      />
    </div>
  );
};

export default TwInput;
