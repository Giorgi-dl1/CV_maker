export const patterns: any = {
  name: /^[ა-ჰ]{2,}$/,
  surname: /^[ა-ჰ]{2,}$/,
  email: /^[a-zA-Z0-9._%+-]+@redberry.ge$/,
  phone_number: /^(\+9955\d{8})$/,
  position: /^(?!.*\s{2,})(.*\S){2,}$/,
  employer: /^(?!.*\s{2,})(.*\S){2,}$/,
  start_date: /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/,
  due_date: /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/,
  description: /^.{1,}$/,
}
