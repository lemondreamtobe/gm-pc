import { Row } from 'react-table'
import { ReactNode } from 'react'
import { TableXPropsType } from '../../base'

type ExpandTableXProps = TableXPropsType & {
  SubComponent(row: Row): ReactNode
  /** 传了 expanded，组件 expand 状态交给 props 控制，则必须同时传 onExpand */
  expanded?: { [key: number]: boolean }
  onExpand?(expanded: { [key: number]: boolean }): void
  fixedExpand?: boolean
}

export type { ExpandTableXProps }