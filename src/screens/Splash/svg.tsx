import React from 'react'
import { SvgProps } from 'react-native-svg'
import BrandSvg from '../../assets/brand.svg'

export default class Svg extends React.Component<SvgProps> {
    render(): React.ReactNode {
      return (
        <BrandSvg width={this.props.width} height={this.props.height} />
      )
    }
}