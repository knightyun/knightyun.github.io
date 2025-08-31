---
title: 贪吃蛇 C 语言源码与算法分析
layout: post
categories: C语言
tags: 贪吃蛇源码 C语言贪吃蛇 gluttonous-snake
excerpt: C 语言贪吃蛇算法详细分析与源代码
---

经典的贪吃蛇游戏算法，无疑是一个较大的挑战，综合性较高，像我这种刚入门C语言的也差不多花了整整一周时间才差不多理解透彻，内部包含了较多的函数，数组，二维数组，循环等思想。
Github项目地址：<https://github.com/knightyun/gluttonousSnake/>

接下来以C语言为例，针对此算法截取代码片段进行详细分析，源码位于文章[底部](#end)。

# 算法分析

## 概述

首先分析一下，贪吃蛇最基本和重要的动作，一段在屏幕上移动和转向的躯干，但是C语言没有移动字符的函数，只能不断向屏幕打印输出和清屏实现移动，躯干位置在屏幕上的变化可以用二维坐标系实现，用一个二维数组保存屏幕所有可见内容的x，y坐标，并赋予几种初始值，然后用函数打印出各种值对应的字符，再用循环和坐标值自增自减实现移动。使用输入函数判断方向，随机函数生成食物，根据头部坐标判断撞墙或吃到自己而结束游戏。

## 头文件

Windows环境中需要包含的头文件：
``` c
#include<stdio.h>     
#include<stdlib.h> 
#include<Windows.h>       /*需要使用system("cls")清屏函数*/
#include<conio.h>         /*非标准库函数，VS中自带，需要使用_getch()函数获取输入*/
#include<time.h>          /*使用随机数函数需要使用time()函数*/
```

## 预定义

游戏内可自定义设置界面宽度与高度，需要给二维数组定义一个最大值：
``` c
#define MAXX 10000                /* 定义游戏最大界面宽度坐标值 */
#define MAXY 10000                /* 定义最大高度 */
```

## 申明变量

需要用到的变量和功能如下：
``` c
int speed = 10;                    /* 设置蛇移动速度 */
int mapArr[MAXX][MAXY];            /* 保存界面坐标值的二维数组 */
int inputX = 50, inputY = 20;      /* 默认游戏界面宽度和高度 */
int randX = -1, randY = -1;        /* 生成的随机食物的坐标值 */
int foodFlag = 0;                  /* 判断是否更新食物 */
int sx = 1, sy = 1;				   /* 设置蛇身坐标值 */
int l = 0;				           /* 蛇身长度 */
int *body[MAXX * MAXY];			   /* 储存蛇身的指针数组 */
char input = '6';			       /* 默认移动方向 */
int overFlag = 1;                  /* 判断游戏结束，撞墙或吃到自己 */
int moveX = 1, moveY = 1;          /* 游戏开始的动画效果坐标值 */
int moveFlag = 0;                  /* 开始动画的循环判断 */
```
>这里使用了指针数组控制蛇身，方便赋值
>数组中的参数虽然不能是变量，但是可以是宏定义

## 函数
接下来就是重要环节了，分析实现游戏效果的各个函数。

* 第一步，定义初始化函数 `InitMap()` 将屏幕上每个点通过二维数组赋予坐标值 x、y，确定游戏界面的大小，我们将四周的墙赋值为 `1`，中间空白赋值为 `0`，蛇身赋值为 `2`，随机出现的食物赋值为 `3`。
* 第二步，定义 `PrintMap()` 函数给每个 坐标值打印对应的字符，我们将墙用字符 `+` 表示，空白用空字符 `" "` 表示，蛇身用星号 `*` 表示，食物用字符 `@` 表示。
* 第三步，定义函数 `StartMsg()` 显示屏幕信息，提示控制的按键。
* 第四步，定义函数 `GetSet()` 使玩家可以自定义游戏界面宽和高和移动速度，使用 `scanf()` 函数获取并改变默认界面尺寸。
* 第五步，定义函数 `SetRandNum()` 在界面中随机出现食物，并且不与蛇身和墙重叠，使用 `srand(time(0))` 初始随机函数，然后用一个循环不断用随机函数 `rand()` 生成随机坐标值，直到所生成位置是空白为止。
* 第六步，最核心的算法，较为复杂，定义函数 `SetSnakeNum()` 设置蛇身的坐标值，并通过通过输入判断前进方向，以设置的速度时间间隔不断自增或自减坐标值实现移动，里面用到了 `_kbhit()` 函数，作用是：有用户输入时，返回值为**真**，无输入时值为**假**。还有 `_getch()` 函数与 `getchar()` 的区别：`_getch()` 输入值后不用输入回车就能获取输入值。感觉最不好理解的就是蛇身的转弯算法，我的方法是：**蛇身每一节在每一次循环不断继承前一节的值**，然后蛇头位置不断获得新坐标值，这样就能实现身体的转向，这里就可以用到之前定义的指针数组 `*body[]` 来实现。算法中还需要**注意**的一点是，蛇身朝某个方向移动时，只能控制另外两个方向，例如向右移动时不能控制向左移动。然后随后的函数就好说了。
* 第七步，定义函数 `EatFood()` 实现遇到食物坐标值时，增加一节蛇身长度值 `l` 。
* 第八步，定义函数 `StartGame()` 来综合之前的函数并开始游戏，需要通过 `overFlag` 判断游戏结束。
* 第九步，定义函数 `SetMoveNum()` 实现游戏开始时的动画效果，对于游戏存在意义不大，仅供研究训练思维和算法。
* 第十步，定义函数 `JudgeEnd()` 判断之前的函数 `SetMuveNum()` 的结束时刻，然后不断循环动画效果。
* 第十一步，定义函数 `StartView()` 开始游戏，按任意键游戏正式开始。

下面是函数申明：

``` c
void InitMap();                   /* initialize the background coordinate system */
void PrintMap();                  /* print every point in the arr mapArr to the screen */
void StartMsg();                  /* start message */
void GetSet();                    /* judge whether to edit the game setting */
void SetRandNum();                /* set a random 'food' point in the screen */
void SetSnakeNum();               /* the most complex and important algorithm of this game */
void EatFood();                   /* judge when to eat food and elongate the body */
void StartGame();                 /* start the game */
void SetMoveNum();                /* algorithm of the start animation, some complex */
void JudgeEnd();                  /* judge the end of the animation and loop again*/
void StartView();                 /* start the start animation view */
```

# 源码 <span id="end">

``` c
#include<stdio.h>
#include<stdlib.h>
#include<Windows.h>                /* use the function 'system("cls")' to clear screen */
#include<conio.h>                 /* use the function '_getch()' to get input */
#include<time.h>                  /* the random function need the 'time()' function */
#include "public-fun.h"

#define MAXX 10000                /* define the max width of game space */
#define MAXY 10000                /* define the max height */

void InitMap();                   /* initialize the background coordinate system */
void PrintMap();                  /* print every point in the arr mapArr to the screen */
void StartMsg();                  /* start message */
void GetSet();                    /* judge whether to edit the game setting */
void SetRandNum();                /* set a random 'food' point in the screen */
void SetSnakeNum();               /* the most complex and important algorithm of this game */
void EatFood();                   /* judge when to eat food and elongate the body */
void StartGame();                 /* start the game */
void SetMoveNum();                /* algorithm of the start animation, some complex */
void JudgeEnd();                  /* judge the end of the animation and loop again*/
void StartView();                 /* start the start animation view */

int speed = 10;                   /* default snake move speed */
int mapArr[MAXX][MAXY];            /* arr to store the point in the screen */
int inputX = 50, inputY = 20;      /* default width and height */
int randX = -1, randY = -1;        /* set a random food point in the background */
int foodFlag = 0;                  /* judge when to change random food point*/
int sx = 1, sy = 1;				/* body x, y point */
int l = 0;						/* body lenth */
int *body[MAXX * MAXY];				/* body array pointer */
char input = '6';			     	/* default direction */
int overFlag = 1;                 /* judge when the game over, hit wall or eat self*/
int moveX = 1, moveY = 1;         /* start move effect */
int moveFlag = 0;                /* restart the loop effection */

void GetSet() 
{
	printf("\n");
	printf("请输入游戏空间的宽度：\n(Please enter the width of game space:)\n");
	scanf_s("%d", &inputX);	
	printf("\n");
	printf("请输入游戏空间的高度：\n(Please enter the height of game space:)\n");
	scanf_s("%d", &inputY);
	printf("\n");
	printf("请输入游戏速度（1 到 n，1 最慢）：\nPlease enter the speed of snake moving:(1 is slowest)\n");
	scanf_s("%d", &speed);
}

void InitMap()
{
	int x, y;
	for (y = 0; y < inputY; y++)
	{
		for (x = 0; x < inputX; x++)

		{
			if ((x == 0) || (x == inputX - 1) || (y == 0) || (y == inputY - 1))
			{
				mapArr[x][y] = 1;
			}
			else
			{
				mapArr[x][y] = 0;
			}
		}
	}
}

void PrintMap()
{
	int x, y;
	for (y = 0; y < inputY; y++)
	{
		for (x = 0; x < inputX; x++)
		{
			switch (mapArr[x][y])
			{
			case 0:
				printf(" ");
				break;
			case 1:
				printf("+");
				break;
			case 2:
				printf("*");
				break;
			case 3:
				printf("@");
			}
		}
		printf("\n");
	}
}

void StartMsg()   
{
	printf
	("'2(top)', '8(down)', '4(left)', 6(right)' 或 \n'w(top)', 'a(left)', 's(down)', 'd(right)'\n控制方向(control the direction)\n");
}

void SetRandNum() 
{
	srand(time(0));
	while ((mapArr[randX + 1][randY + 1] != 0) && (foodFlag == 0))
	{
		randX = rand() % (inputX - 2), randY = rand() % (inputY - 2);
	}
	mapArr[randX + 1][randY + 1] = 3;	/* set foot number 3 */
	foodFlag = 1;
}

void SetSnakeNum()
{
	if (_kbhit())         /* if there is an input, get it; if not, go on	*/
	{
		int a = _getch();		
		switch (input)
		{
		case '2':
		case 'w':
			if (a == '4' || a == '6' || a == 'a' || a == 'd' || a == '2' || a == 'w')
				input = a;
			break;
		case '8':
		case 's':
			if (a == '4' || a == '6' || a == 'a' || a == 'd' || a == '8' || a == 's')
				input = a;
			break;
		case '4':
		case 'a':
			if (a == '2' || a == '8' || a == 'w' || a == 's' || a == '4' || a == 'a')
				input = a;
			break;
		case '6':
		case 'd':
			if (a == '2' || a == '8' || a == 'w' || a == 's' || a == '6' || a == 'd')
				input = a;
			break;
		}
	}
	switch (input)				/* judge the direction by value of input */
	{
	case '2':					/* up */
	case 'w':
		sy--;
		break;
	case '8':					/* down */
	case 's':
		sy++;
		break;
	case '4':					/* left */
	case 'a':
		sx--;
		break;
	case '6':					/* right */
	case 'd':
		sx++;
		break;
	}
	int i;
	for (i = l; i != 0; i--)           /*  every point's address of body move back one point */
	{
		body[i] = body[i - 1];
		*body[i] = 2;                 /* change value by pointer */
	}
	body[0] = &mapArr[sx][sy];
	if ((*body[0] == 1) || (*body[0] == 2))    /* judge when the snake hit the wall or eat itself */
	{
		overFlag = 0;
	}
	*body[0] = 2;              /* assign the head of snake by pointer */
}

void EatFood() 
{
	if (*body[0] == 3)
	{
		l++;
		foodFlag = 0;
	}
}

void StartGame()
{
	sx = 1;
	sy = 1;
	l = 0;
	input = '6';
	int j;
	for (j = 0; j < l; j++)             /* assign the snake body initial address value*/
	{
		body[j] = &mapArr[sx - j][sy];   
	}
	while (overFlag)    /* loop until the game over */
	{
		InitMap();
		SetSnakeNum();
		SetRandNum();
		EatFood();
		PrintMap();
		StartMsg();
		Sleep(1000/speed);
		system("cls");
	}
}

void SetMoveNum()
{
	/* x move 1 -- (X - 2 ); y move 1 -- (Y - 2) */
	/* move x from left to right */
	if ((moveY == 1 + moveFlag) && (moveX < inputX - 2 - moveFlag))
	{
		mapArr[moveX][moveY] = 2;
		moveX++;
	}
	/* move y from top to buttom */
	else if ((moveX == inputX - 2 - moveFlag) && (moveY < inputY - 2 - moveFlag))
	{
		mapArr[moveX][moveY] = 2;
		moveY++;
	}
	/* move x from right to left */
	else if ((moveY == inputY - 2 - moveFlag) && (moveX > 1 + moveFlag))
	{
		mapArr[moveX][moveY] = 2;
		moveX--;
	}
	/* move y from buttom to top */
	else if ((moveX == 1 + moveFlag) && (moveY > 1 + moveFlag))
	{
		mapArr[moveX][moveY] = 2;
		moveY--;
		if (moveY == 2 + moveFlag)     /* judge when to jump to a deeper layer */
		{
			moveFlag++;
		}
	}
}

void JudgeEnd() 
{
	int i, j;
	int tmp = 1;
	for (j = 0; j < inputY; j++)
	{
		for (i = 0; i < inputX; i++)
		{
			if (mapArr[i][j] == 0)
				goto out;
		}
	}
	moveX = 1, moveY = 1;
	InitMap();
	moveFlag = 0;
out:;
}

void StartView()
{
	moveX = 1, moveY = 1, moveFlag = 0;
	int startFlag = 1;
	InitMap();
	while (startFlag)
	{
		SetMoveNum();
		PrintMap();
		printf("按任意键开始游戏：\n(Press any key to start game: )\n");
		Sleep(10);
		system("cls");
		JudgeEnd();
		if (_kbhit())
		{
			int c = _getch();
			if ((c != '2') && (c != 'w') && (c != '8') && (c != 's') && (c != '4') && (c != 'a') && (c != '6') && (c != 'd'))
				startFlag = 0;
		}
	}
}

int main()             /* main function */
{
	while (1)
	{
		printf("是否修改设置（修改输入“y”,否则按任意键）：\nEdit the game setting or not ? (Press 'y' to edit, or press another key to go on:)\n");
		if (_getch() == 'y')
		{
			GetSet();          
		}
		StartView();  /* an animation before game start */
		StartGame();
		printf("Game Over !!!\n游戏结束，按任意键继续：\n(Press any key to restart: )\n");
		_getch();
		overFlag = 1;   /* restart the game by the flag */
		system("cls");
	}
} 
```

有更简单的算法欢迎评论指正！

# 返回[顶部](#home)