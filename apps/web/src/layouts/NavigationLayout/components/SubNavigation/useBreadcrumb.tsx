import { RouterService } from '@web/core/router'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type Item = { label: string; key: string; onClick?: () => void }

type ItemBreadcrumb = {
  title: string
  key: string
  path: string
  menu?: { items: Item[] }
  onClick: () => void
}

type TreeNode = {
  name: string
  nameWithParam: string
  tree: Tree
  pathWithParams?: string
  item?: Item
}

type Tree = Record<string, TreeNode>

type Props = {
  items: Item[]
}

type TypeReturn = {
  items: ItemBreadcrumb[]
}

const getPathBlocks = (path: string) => {
  return path.split('/').filter(block => block !== '')
}

const isPathPure = (path: string) => {
  return !path.includes(':')
}

const buildTree = (items: Item[], params: Record<string, string>): Tree => {
  const tree: Tree = {}

  for (const item of items) {
    const itemBlocks = getPathBlocks(item.key)

    let treeCheckpoint: Tree = tree

    for (let index = 0; index < itemBlocks.length; index++) {
      const name = itemBlocks[index]

      const nameWithParam = RouterService.applyParamsToUrl(name, params)

      treeCheckpoint[name] = treeCheckpoint[name] ?? {
        name,
        nameWithParam,
        tree: {},
      }

      const isLast = index === itemBlocks.length - 1

      if (isLast) {
        treeCheckpoint[name].item = item
        treeCheckpoint[name].pathWithParams = RouterService.applyParamsToUrl(
          item.key,
          params,
        )
      } else {
        treeCheckpoint = treeCheckpoint[name].tree
      }
    }
  }

  return tree
}

export const useBreadcrumb = ({ items }: Props): TypeReturn => {
  const router = useRouter()
  const pathname = usePathname()
  const params: Record<string, string> = useParams()

  const [itemsBreadcrumbs, setItemsBreadcrumbs] = useState([])

  const goTo = (url: string) => {
    router.push(url)
  }

  const tree = buildTree(items, params)

  const fromTreeToBreadcrumbItems = (
    tree: Tree,
    path: string,
  ): ItemBreadcrumb[] => {
    const pathWithParams = RouterService.restoreUrl(path, params)
    const blocks = getPathBlocks(pathWithParams)

    const items: ItemBreadcrumb[] = []

    let treeCheckpoint = tree
    let treeNode: TreeNode

    for (let index = 0; index < blocks.length + 1; index++) {
      const block = blocks[index]
      const blockNext = blocks[index + 1]

      treeNode = treeCheckpoint[block]

      if (!treeNode) {
        break
      }

      if (treeNode.item) {
        const treeNodeNested: TreeNode[] = Object.values(treeNode.tree ?? {})

        const treeNodePure = treeNodeNested.filter(
          treeNode =>
            isPathPure(treeNode.name) &&
            treeNode.item &&
            treeNode.nameWithParam !== blockNext,
        )

        const menuItems: Item[] = treeNodePure.map(treeNode => ({
          ...treeNode.item,
          onClick: () => {
            goTo(treeNode.pathWithParams)
          },
        }))

        if (blocks.length === 1 && menuItems.length === 0) {
          continue
        }

        const pathWithParam = treeNode.pathWithParams

        const item: ItemBreadcrumb = {
          title: treeNode.item.label,
          key: treeNode.item.key,
          path: treeNode.item.key,
          onClick: () => {
            goTo(pathWithParam)
          },
        }

        if (menuItems.length > 0) {
          item.menu = { items: menuItems }
        }

        items.push(item)
      }

      treeCheckpoint = treeNode.tree
    }

    return items
  }

  useEffect(() => {
    setItemsBreadcrumbs(fromTreeToBreadcrumbItems(tree, pathname))
  }, [pathname])

  return {
    items: itemsBreadcrumbs,
  }
}
