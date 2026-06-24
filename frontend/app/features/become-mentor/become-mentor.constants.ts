import type { BecomeMentorDocumentKey, BecomeMentorFormState } from './become-mentor.types'

export const initialBecomeMentorFormState: BecomeMentorFormState = {
  avatarUrl: '',
  fullName: '',
  gender: '',
  hometown: '',
  currentLocation: '',
  headline: '',
  introduction: '',
  teachingStyle: '',
  experienceYears: '',
  currentPosition: '',
  workplace: '',
  offerings: [],
  availabilities: [],
  verificationFullName: '',
  idCardNumber: '',
  documents: {
    idFront: '',
    idBack: '',
    selfieWithId: ''
  }
}

export const verificationDocumentMeta: Array<{
  key: BecomeMentorDocumentKey
  label: string
  description: string
}> = [
  {
    key: 'idFront',
    label: 'Mặt trước CCCD / ID',
    description: 'Ảnh rõ nét, không lóa sáng, thấy đủ thông tin cá nhân.'
  },
  {
    key: 'idBack',
    label: 'Mặt sau CCCD / ID',
    description: 'Cần hiện đầy đủ mã QR, nơi cấp hoặc thông tin bổ sung.'
  },
  {
    key: 'selfieWithId',
    label: 'Ảnh chân dung cầm giấy tờ',
    description: 'Giúp đội ngũ kiểm tra tính xác thực trước khi duyệt.'
  }
]
