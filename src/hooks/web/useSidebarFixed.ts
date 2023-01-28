export const sidebarFixedChange = (store: any, val: any) => {
  if (
    val &&
    (!store.menuModeIsHorizontal || !store.menuModeIsOverlay) &&
    !store.getSideMenuConfig
  ) {
    store.toggleSideMenu()
  }
}
