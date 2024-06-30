## 介绍

这是一个 TDD 开发实战项目, 学习如何用 TDD 的方式开发项目, 参考学习视屏
[催学社 - 单元测试课](https://learn.cuixueshe.com/p/t_pc/course_pc_detail/column/p_63f3795ee4b06159f73e6452?product_id=p_63f3795ee4b06159f73e6452)

这个项目分为两个大的部分:

- 游戏部分(`/game`): 就是实现传统的小游戏推箱子
- 地图编辑器部分(`/map_editor`): 图形化的界面编辑数据, 用于自己手动创造关卡数据

如何实现这个游戏并不是重点, 重点是 `如何用 TDD 的开发方式, 一步步重构易于维护的代码`, 所以测试才是重点

小步走, 验证没有问题后再去思考如何实现下一步, 然后查看代码, 重构优化

先写测试后实现, 从红到绿(测试例子的状态)写出来的代码, 测试覆盖率高,

而且都是一步步验证的, 错误少, 所以不会经常卡壳, 可以一直写, 写完之后再打开UI去手动测试

如果手动测试, 写完后面的功能, 可能还要看下有没有影响前面的功能

## 在线体验地址

- [在线体验](https://liaohui5.github.io/tdd-push-box-game/#/game)

## 快速开始

```sh
git clone https://github.com/liaohui5/tdd-push-box-game ./push-box

cd push-box

pnpm install

pnpm run dev # http://localhost:8080/tdd-push-box-game/

# for unit tests
pnpm run test

# for unit test coverage
pnpm run test:coverage
```

## 注意

因为需要部署到 Github Pages 的原因, 所以 vite 配置是根据 github pages 来修改的, 如果需要部署到自己的 Github Pages 需要修改 vite.config.ts 的 base 选项

```ts
export default {
  base: "/your-github-repo-name/",
};
```
