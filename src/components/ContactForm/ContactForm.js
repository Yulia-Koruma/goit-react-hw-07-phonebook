import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import {
  FormContainer,
  Form,
  Field,
  FormGroup,
  ErrorMessage,
  FormButton,
} from './ContactForm.styled';
import { addContact } from '../../redux/contactsSlice';

const formSchema = Yup.object().shape({
    name: Yup.string()
    .min(2, 'Name must contain at least 2 characters')
    .max(40, 'Too long name')
    .required('Name is required!'),
    number: Yup.string()
    .matches(/^\+(?:[0-9] ?){6,14}[0-9]$/, {
        message: 'Invalid Phone Number!',
        excludeEmptyString: false,
    })
    .required('Phone number is required!')
    .max(15, 'Invalid phone number!'),
});


export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);

  return (
    <FormContainer>
      <Formik
        initialValues={{ name: '', number: '' }}
        validationSchema={formSchema}
        onSubmit={(values, actions) => {
          if (
            contacts.some(
              contact =>
                contact.name.toLocaleLowerCase() ===
                values.name.toLocaleLowerCase()
            )
          ) {
            return toast.error(`${values.name} is olready in your contacts`);
          }
          dispatch(addContact(values));
          actions.resetForm();
        }}
      >
        <Form>
          <FormGroup>
            Name
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="span" />
          </FormGroup>

          <FormGroup>
            Number
            <Field type="tel" name="number" />
            <ErrorMessage name="number" component="span" />
          </FormGroup>

          <FormButton type="submit">Add contact</FormButton>
        </Form>
      </Formik>
    </FormContainer>
  );
};