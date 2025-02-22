export interface UserModel {
  id: string
  name: string
  email: string
  password: string
  passwordConfirmation: string
  isAdmin: boolean
  createdAt: Date
}