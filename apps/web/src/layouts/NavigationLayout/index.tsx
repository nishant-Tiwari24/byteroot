import { RouterObject } from '@web/core/router'
import { useDesignSystem } from '@web/designSystem'
import { Model } from '@web/domain'
import { useAuthentication } from '@web/modules/authentication'
import { Col, Layout, Row } from 'antd'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { Logo } from './components/Logo'
import { Topbar } from './components/Topbar/index.layout'

interface Props {
  children: ReactNode
}

export const NavigationLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter()

  const authentication = useAuthentication()
  const user = authentication?.user as Model.User

  const { isMobile } = useDesignSystem()

  const goTo = (url: string) => {
    router.push(url)
  }

  const goToUserPage = (url: string) => {
    router.push(url.replace(':id', user?.id))
  }

  const itemsLeftbar = [
    {
      key: '/challenges/new',
      label: 'Post Challenge',
      onClick: () => goTo('/challenges/new'),
    },

    {
      key: '/challenges',
      label: 'Explore',
      onClick: () => goTo('/challenges'),
    },

    {
      key: '/dashboard',
      label: 'Dashboard',
      onClick: () => goTo('/dashboard'),
    },
  ]

  const itemsUser = []

  const itemsTopbar = [
    {
      key: '/challenges/new',
      label: 'Post Challenge',
      onClick: () => goTo('/challenges/new'),
    },

    {
      key: '/challenges',
      label: 'Explore',
      onClick: () => goTo('/challenges'),
    },

    {
      key: '/dashboard',
      label: 'Dashboard',
      onClick: () => goTo('/dashboard'),
    },
  ]

  const itemsSubNavigation = [
    {
      key: '/challenges/new',
      label: 'Post Challenge',
    },

    {
      key: '/challenges',
      label: 'Explore',
    },

    {
      key: '/challenge/:id',
      label: 'Challenge Details',
    },

    {
      key: '/challenge/:id/solve',
      label: 'Solve Challenge',
    },

    {
      key: '/challenge/:id/discussion',
      label: 'Challenge Discussion',
    },

    {
      key: '/dashboard',
      label: 'Dashboard',
    },
  ]

  const itemsMobile = [
    {
      key: 'profile',
      label: 'Profile',
      onClick: () => goTo(RouterObject.route.PROFILE),
    },
    {
      key: 'notifications',
      label: 'Notifications',
      onClick: () => goTo(RouterObject.route.NOTIFICATIONS),
    },
    ...itemsTopbar,
    // ...itemsLeftbar,
  ]

  const isLeftbar = itemsLeftbar.length > 0 && !isMobile

  return (
    <>
      <Layout>
        <Row
          style={{
            height: '100vh',
            width: '100vw',
          }}
        >
          {/* {isLeftbar && (
            <Col>
              <Leftbar
                items={itemsLeftbar}
                itemsUser={itemsUser}
                logo={<Logo className="m-2" />}
              />
            </Col>
          )} */}

          <Col
            style={{
              flex: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <Topbar
              isMobile={isMobile}
              items={itemsTopbar}
              itemsMobile={itemsMobile}
              logo={<Logo />}
            />

            <Col
              style={{
                flex: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {/* <SubNavigation items={itemsSubNavigation} /> */}

              {children}
            </Col>
          </Col>
        </Row>
      </Layout>
    </>
  )
}
