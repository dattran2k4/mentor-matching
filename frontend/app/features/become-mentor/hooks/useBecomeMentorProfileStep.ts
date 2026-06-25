import type { ChangeEvent } from 'react'
import { useEffect, useMemo } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import type { Resolver } from 'react-hook-form'

import { useCitiesQuery } from '@/hooks/queries/location/useCitiesQuery'
import { useDistrictsByCityQuery } from '@/hooks/queries/location/useDistrictsByCityQuery'
import { useUploadMediaMutation } from '@/hooks/queries/media/useUploadMediaMutation'
import { useCreateCurrentMentorMutation } from '@/hooks/queries/mentor/useCreateCurrentMentorMutation'
import { useCurrentMentorOnboardingStatusQuery } from '@/hooks/queries/mentor/useCurrentMentorOnboardingStatusQuery'
import { useCurrentMentorProfileQuery } from '@/hooks/queries/mentor/useCurrentMentorProfileQuery'
import { useUpdateCurrentMentorAvatarMutation } from '@/hooks/queries/mentor/useUpdateCurrentMentorAvatarMutation'
import { useUpdateCurrentMentorMutation } from '@/hooks/queries/mentor/useUpdateCurrentMentorMutation'
import type { CurrentMentorApiResponse } from '@/types/api/mentor'

import type { BecomeMentorFormState } from '../become-mentor.types'
import {
  emptyBecomeMentorProfileFormValues,
  mapBecomeMentorProfileFormValuesToRequest,
  mapCurrentMentorToBecomeMentorProfileFormValues
} from '../mappers/profile.mapper'
import {
  becomeMentorProfileSchema,
  type BecomeMentorProfileFormValues
} from '../schemas/profile.schema'

const becomeMentorProfileResolver = zodResolver(
  becomeMentorProfileSchema as never
) as unknown as Resolver<BecomeMentorProfileFormValues>

export type BecomeMentorProfileStepState = Omit<
  BecomeMentorFormState,
  | 'avatarUrl'
  | 'avatarMediaId'
  | 'hometown'
  | 'currentLocation'
  | 'offerings'
  | 'availabilities'
  | 'verificationFullName'
  | 'idCardNumber'
  | 'documents'
>

type UseBecomeMentorProfileStepParams = {
  formId: string
  profileState: BecomeMentorProfileStepState
  onSubmit: (values: BecomeMentorProfileFormValues, currentMentor: CurrentMentorApiResponse) => void
}

export function useBecomeMentorProfileStep({
  formId,
  onSubmit,
  profileState
}: UseBecomeMentorProfileStepParams) {
  const onboardingStatusQuery = useCurrentMentorOnboardingStatusQuery()
  const shouldFetchCurrentProfile = Boolean(onboardingStatusQuery.data?.mentorProfileCreated)
  const currentProfileQuery = useCurrentMentorProfileQuery(shouldFetchCurrentProfile)
  const createCurrentMentorMutation = useCreateCurrentMentorMutation()
  const updateCurrentMentorMutation = useUpdateCurrentMentorMutation()
  const updateCurrentMentorAvatarMutation = useUpdateCurrentMentorAvatarMutation()
  const uploadMediaMutation = useUploadMediaMutation()
  const form = useForm<BecomeMentorProfileFormValues>({
    resolver: becomeMentorProfileResolver,
    defaultValues: {
      ...emptyBecomeMentorProfileFormValues,
      ...profileState
    }
  })
  const currentMentor = currentProfileQuery.data?.currentMentor
  const existingAvatarUrl = currentMentor?.avatarUrl || ''
  const existingAvatarMediaId = currentMentor?.avatarMediaId ?? null
  const avatarFile = useWatch({ control: form.control, name: 'avatarFile' })
  const currentCityId = useWatch({ control: form.control, name: 'currentCityId' })
  const currentCityIdNumber = currentCityId ? Number(currentCityId) : null
  const citiesQuery = useCitiesQuery('')
  const districtsQuery = useDistrictsByCityQuery(currentCityIdNumber)
  const temporaryAvatarPreviewUrl = useMemo(
    () => (avatarFile ? URL.createObjectURL(avatarFile) : ''),
    [avatarFile]
  )
  const avatarPreviewUrl = temporaryAvatarPreviewUrl || existingAvatarUrl
  const cityOptions = useMemo(
    () => (citiesQuery.data ?? []).map((city) => ({ label: city.name, value: String(city.id) })),
    [citiesQuery.data]
  )
  const districtOptions = useMemo(
    () =>
      (districtsQuery.data ?? []).map((district) => ({
        label: district.name,
        value: String(district.id)
      })),
    [districtsQuery.data]
  )

  useEffect(() => {
    if (!temporaryAvatarPreviewUrl) return

    return () => {
      URL.revokeObjectURL(temporaryAvatarPreviewUrl)
    }
  }, [temporaryAvatarPreviewUrl])

  useEffect(() => {
    if (!currentMentor) return

    form.reset(mapCurrentMentorToBecomeMentorProfileFormValues(currentMentor))
  }, [currentMentor, form])

  const handleAvatarFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    form.setValue('avatarFile', file, { shouldDirty: true, shouldValidate: true })
    event.target.value = ''
  }

  const handleSubmit = form.handleSubmit(async (values) => {
    if (!values.avatarFile && !existingAvatarMediaId && !existingAvatarUrl) {
      form.setError('avatarFile', {
        message: 'Vui lòng chọn ảnh đại diện',
        type: 'required'
      })
      return
    }

    const payload = mapBecomeMentorProfileFormValuesToRequest(values)
    const profileResult = shouldFetchCurrentProfile
      ? await updateCurrentMentorMutation.mutateAsync(payload)
      : await createCurrentMentorMutation.mutateAsync(payload)
    let savedCurrentMentor = profileResult.currentMentor

    if (values.avatarFile) {
      const uploadResponse = await uploadMediaMutation.mutateAsync({
        file: values.avatarFile,
        purpose: 'AVATAR',
        resourceType: 'IMAGE'
      })
      const avatarResult = await updateCurrentMentorAvatarMutation.mutateAsync({
        avatarMediaId: uploadResponse.data.id
      })

      savedCurrentMentor = avatarResult.currentMentor
    }

    onSubmit(values, savedCurrentMentor)
  })
  const isLoading =
    onboardingStatusQuery.isLoading || (shouldFetchCurrentProfile && currentProfileQuery.isLoading)
  const isError =
    onboardingStatusQuery.isError || (shouldFetchCurrentProfile && currentProfileQuery.isError)
  const isSubmitting =
    createCurrentMentorMutation.isPending ||
    updateCurrentMentorMutation.isPending ||
    updateCurrentMentorAvatarMutation.isPending ||
    uploadMediaMutation.isPending

  return {
    formId,
    isError,
    isLoading,
    isSubmitting,
    onRetry: () => {
      void onboardingStatusQuery.refetch()
      if (shouldFetchCurrentProfile) {
        void currentProfileQuery.refetch()
      }
    },
    onSubmit: handleSubmit,
    personalSectionProps: {
      avatarPreviewUrl,
      cityOptions,
      control: form.control,
      currentCityId,
      districtOptions,
      errors: form.formState.errors,
      existingAvatarMediaId,
      existingAvatarUrl,
      isCitiesLoading: citiesQuery.isLoading,
      isDistrictsLoading: districtsQuery.isLoading,
      onAvatarChange: handleAvatarFileChange,
      onCurrentCityChange: (cityId: string) => {
        form.setValue('currentCityId', cityId, { shouldDirty: true, shouldValidate: true })
        form.setValue('currentDistrictId', '', { shouldDirty: true, shouldValidate: true })
      },
      register: form.register
    },
    status: onboardingStatusQuery.data,
    teachingSectionProps: {
      control: form.control,
      errors: form.formState.errors,
      register: form.register
    }
  }
}
