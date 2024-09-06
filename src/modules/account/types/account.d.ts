type CombinedRouteList = keyof MyNavigationParamList;

interface MenuItem {
  title: string;
  onPress?: () => void;
  route?: CombinedRouteList;
  hideCaret?: boolean;
  titleClassName?: string;
}
