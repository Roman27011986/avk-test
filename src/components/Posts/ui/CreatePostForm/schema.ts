import * as yup from 'yup';

const schema = yup.object().shape({
  title: yup
    .string()
    .required('Title is a required field')
    .min(4)
    .max(18),
  body: yup
    .string()
    .required('Body is a required field')
    .min(4)
    .max(12),
});

export default schema;