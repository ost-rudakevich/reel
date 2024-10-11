import { FC } from 'react'
import styles from './SelectComponent.module.scss'
import { IOption, ISelect } from './select-component.interface'
import ReactSelect, { OnChangeValue } from 'react-select'

const SelectComponent: FC<ISelect> = ({
  field,
  options,
  placeholder,
  isMulti,
  isLoading,
  error
}) => {
  const onChange = (newValue: unknown | OnChangeValue<IOption, boolean>) => {
    field.onChange(
      isMulti
        ? (newValue as IOption[]).map((item: IOption) => item.value)
        : (newValue as IOption).value
    )
  }

  const getValue = () => {
    if (field.value) {
      return isMulti
        ? options.filter(option => field.value.indexOf(option.value) >= 0)
        : options.find(option => option.value === field.value)
    } else {
      return isMulti ? [] : ''
    }
  }
  return (
    <div className={styles['select_container']}>
      <ReactSelect
        classNamePrefix='custom-select'
        placeholder={placeholder}
        options={options}
        value={getValue()}
        onChange={onChange}
        isMulti={isMulti}
        isLoading={isLoading}
      />
      {error && <div className={styles.error}>{error}</div>}
    </div>
  )
}

export default SelectComponent
