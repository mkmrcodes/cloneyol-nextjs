import TailwindInput from './TailwindInput';
import TailwindTextArea from './TailwindTextArea';

const FormikControl = (props) => {
  const { control, ...rest } = props;
  switch (control) {
    case 'input':
      return <TailwindInput {...rest} />;
    case 'textarea':
      return <TailwindTextArea {...rest} />;
    case 'select':
    case 'radio':
    case 'checkbox':
    case 'date':
    default:
      return null;
  }
};

export default FormikControl;
