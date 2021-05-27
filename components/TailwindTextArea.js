import React from 'react';
import { Field } from 'formik';

const TailwindTextArea = (props) => {
  const { label, name, ...rest } = props;
  return (
    <Field name={name}>
      {({ field, form }) => {
        return (
          <div
            className={'w-full flex flex-col p-2'}
            role="group"
          >
            <label className={'mb-0'} htmlFor={name}>
              {label}
            </label>
            <textarea
              id={name}
              className={
                'px-3 py-2 bg-[#272e33] border border-white rounded-lg ' +  (form.errors[name] && form.touched[name] ? 'focus:border-red-500' : 'focus:border-[#22C35E]')
              }
              rows="3"
              aria-invalid={form.errors[name] && form.touched[name]}
              {...rest}
              {...field}
            />
            {form.errors[name] && form.touched[name] ? (
              <div aria-live="polite">{form.errors[name]}</div>
            ) : null}
          </div>
        );
      }}
    </Field>
  );
};

export default TailwindTextArea;
