import { createNavigationContainerRef } from '@react-navigation/core';
import { CommonActions, DrawerActions, StackActions, TabActions } from '@react-navigation/routers';
import { Animated } from 'react-native';

export const navigationRef = createNavigationContainerRef();

function navigationCheck(moveCallback: () => void): void {
  if (!navigationRef.isReady()) {
    setTimeout(() => navigationCheck(moveCallback), 50);
  } else {
    moveCallback?.();
  }
}

export function navigatePop(screenCount: number = 0, isPopToTop: boolean = false): void {
  navigationCheck(() => {
    const popAction = isPopToTop ? StackActions.popToTop() : StackActions.pop(screenCount);
    navigationRef.dispatch(popAction);
  });
}

export function navigateBack(): void {
  navigationCheck(() => {
    const backAction = CommonActions.goBack();
    navigationRef.dispatch(backAction);
  });
}

export function navigateWithReplace(routeName: string, params = {}): void {
  navigationCheck(() => {
    const replaceAction = StackActions.replace(routeName, params);
    navigationRef.dispatch(replaceAction);
  });
}

export function navigateWithParam(routeName: string, params = {}, merge: boolean = false): void {
  navigationCheck(() => {
    const navigateAction = CommonActions.navigate({
      name: routeName,
      params,
      merge
    });
    navigationRef.dispatch(navigateAction);
  });
}

export function navigateWithPush(routeName: string, params = {}): void {
  navigationCheck(() => {
    const pushAction = StackActions.push(routeName, params);
    navigationRef.dispatch(pushAction);
  });
}

export function navigateWithReset(stackName: string, routeName: string, params = {}): void {
  navigationCheck(() => {
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [
        {
          name: stackName,
          state: { routes: [{ name: routeName, params }] }
        }
      ]
    });
    navigationRef.dispatch(resetAction);
  });
}

export function navigateOpenDrawer(): void {
  navigationCheck(() => {
    const openAction = DrawerActions.openDrawer();
    navigationRef.dispatch(openAction);
  });
}

export function navigateCloseDrawer(): void {
  navigationCheck(() => {
    const closeAction = DrawerActions.closeDrawer();
    navigationRef.dispatch(closeAction);
  });
}

export function navigateToggleDrawer(): void {
  navigationCheck(() => {
    const toggleAction = DrawerActions.toggleDrawer();
    navigationRef.dispatch(toggleAction);
  });
}

export function navigateJumpToDrawer(routeName: string, params = {}): void {
  navigationCheck(() => {
    const jumpToAction = DrawerActions.jumpTo(routeName, params);
    navigationRef.dispatch(jumpToAction);
  });
}

export function navigateJumpToTab(routeName: string, params = {}): void {
  navigationCheck(() => {
    const jumpToAction = TabActions.jumpTo(routeName, params);
    navigationRef.dispatch(jumpToAction);
  });
}

const config = {
  animation: 'timing',
  config: { duration: 200 }
};
const transitionSpec = {
  open: config,
  close: config
};

export const leftToRightAnimation = {
  transitionSpec,
  gestureDirection: 'horizontal',
  cardStyleInterpolator: ({ current, next, layouts }) => {
    const translateXForCurrent = current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [-layouts.screen.width, 0]
    });
    let translateXForNext = 1;
    if (next) {
      translateXForNext = next.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, layouts.screen.width]
      });
    }
    const progress = Animated.add(current.progress, next?.progress || 0);
    const opacity = progress.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 1, 0]
    });

    return {
      cardStyle: {
        transform: [{ translateX: translateXForCurrent }, { translateX: translateXForNext }],
        opacity,
        marginLeft: -1
      }
    };
  }
};

export const rightToLeftAnimation = {
  transitionSpec,
  gestureDirection: 'horizontal',
  cardStyleInterpolator: ({ current, next, layouts }) => {
    const translateXForCurrent = current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [layouts.screen.width, 0]
    });
    let translateXForNext = 1;
    if (next) {
      translateXForNext = next.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -layouts.screen.width]
      });
    }
    const progress = Animated.add(current.progress, next?.progress || 0);
    const opacity = progress.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 1, 0]
    });

    return {
      cardStyle: {
        transform: [{ translateX: translateXForCurrent }, { translateX: translateXForNext }],
        opacity,
        marginLeft: -1
      }
    };
  }
};

export const topToBottomAnimation = {
  transitionSpec,
  gestureDirection: 'vertical',
  cardStyleInterpolator: ({ current, next, layouts }) => {
    const translateYForCurrent = current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [-layouts.screen.height, 0]
    });
    let translateYForNext = 1;
    if (next) {
      translateYForNext = next.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, layouts.screen.height]
      });
    }
    const progress = Animated.add(current.progress, next?.progress || 0);
    const opacity = progress.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 1, 0]
    });

    return {
      cardStyle: {
        transform: [{ translateY: translateYForCurrent }, { translateY: translateYForNext }],
        opacity,
        marginLeft: -1
      }
    };
  }
};

export const bottomToTopAnimation = {
  transitionSpec,
  gestureDirection: 'vertical',
  cardStyleInterpolator: ({ current, next, layouts }) => {
    const translateYForCurrent = current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [layouts.screen.height, 0]
    });
    let translateYForNext = 1;
    if (next) {
      translateYForNext = next.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -layouts.screen.height]
      });
    }
    const progress = Animated.add(current.progress, next?.progress || 0);
    const opacity = progress.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 1, 0]
    });

    return {
      cardStyle: {
        transform: [{ translateY: translateYForCurrent }, { translateY: translateYForNext }],
        opacity,
        marginLeft: -1
      }
    };
  }
};
