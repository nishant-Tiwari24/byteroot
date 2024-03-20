import { theme } from 'antd'
import { ThemeCommon } from './theme.common'

export const ThemeLight = {
  algorithm: theme.defaultAlgorithm,
  token: {
    ...ThemeCommon.token,
    motion: false,
    colorTextBase: 'black',
    colorBgBase: 'white',
    colorPrimary: 'black',
    colorPrimaryBg: 'white',
    colorLink: 'black',
    colorBgContainer: 'white',
  },
  components: {
    ...ThemeCommon.components,
    Layout: {
      headerBg: 'white',
      footerBg: 'white',
      bodyBg: 'white',
      siderBg: '#fbfbfb',
    },
    Menu: {
      activeBarBorderWidth: 0,
      itemHeight: 30,
      itemColor: '#909090',
      itemSelectedColor: 'black',
      itemHoverBg: 'transparent',
      itemSelectedBg: 'transparent',
      itemBg: 'transparent',
      itemActiveBg: 'transparent',
    },
  },
}
