export const patterns: any = {
  name: /^[ა-ჰ\s]{2,}$/,
  surname: /^[ა-ჰ\s]{2,}$/,
  email: /^[a-zA-Z0-9._%+-]+@redberry.ge$/,
  phone_number: /^(\+9955\d{8})$/,
  position: /^.{2,}$/,
  employer: /^.{2,}$/,
  start_date: /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/,
  due_date: /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/,
  description: /^.{1,}$/,
  institute: /^.{2,}$/,
  degree: /^\d{1,}$/,
}
