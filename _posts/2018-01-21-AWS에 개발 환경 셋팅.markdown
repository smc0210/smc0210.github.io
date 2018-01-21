---
title: "AWS(ubuntu)에 개발 환경 셋팅"
layout: post
date: 2018-01-21 19:25
image: /assets/images/markdown.jpg
headerImage: false
tag:
- AWS
- ubuntu
- APM
- PHP
- MySQL
- nginx
- laravel
category: blog
author: 신명철
description: AWS EC2에 기본적인 개발환경 셋팅

---

## Summary:

AWS(Ubuntu 16 LTS) EC2(t2.micro)에 APM 개발환경 셋팅

## APM 설치

패키지 목록 업데이트
{% highlight bash %}
sudo apt-get update
{% endhighlight %}

패키지 업데이트
{% highlight bash %}
sudo apt-get upgrade
{% endhighlight %}

### Apache2 웹서버 설치
{% highlight bash %}
sudo apt-get install apache2
{% endhighlight %}

정상적으로 설치 되었는지 웹브라우져로 확인
![Apache check][1]
> `elastic IP`를 연결했다면 고정IP로 아니라면 `instance` 메뉴에서 할당된 public IP 주소로 연결을 확인한다.
> 
> `public IP`는 `instance`를 종료후 재시작할때마다 변경되니 주의


### MySQL 서버 설치
{% highlight bash %}
sudo apt-get install mysql-server
{% endhighlight %}


### PHP(7.1) 설치 

php를 다운받기 위해 저장소 추가
{% highlight bash %}
sudo add-apt-repository ppa:ondrej/php
{% endhighlight %}

추가한 저장소로부터 패키지 목록 업데이트
{% highlight bash %}
sudo apt-get update
{% endhighlight %}

PHP 7.1 기본패키지 설치
{% highlight bash %}
sudo apt-get install php7.1 php7.1-common
{% endhighlight %}

PHP 7.1 확장패키지 설치
{% highlight bash %}
sudo apt-get install php7.1-mysql php7.1-curl php7.1-xml php7.1-zip php7.1-gd php7.1-mbstring php7.1-mcrypt
{% endhighlight %}

PHP 정상적으로 설치 되었는지 웹브라우져로 확인
![php check][2]


### nginx, redis 설치
{% highlight bash %}
sudo apt-get install -y nginx redis-server redis-tools
{% endhighlight %}

### composer 전역 설치
{% highlight bash %}
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
sudo chmod +x /usr/local/bin/composer
{% endhighlight %}

### laravel 설치
{% highlight bash %}
sudo composer create-project laravel/laravel laravel --prefer-dist
{% endhighlight %}

### homestead 설치
{% highlight bash %}
sudo composer require laravel/homestead --dev
{% endhighlight %}

## FTP 설정하기

우분투에 vsftp 설치하기
{% highlight bash %}
sudo apt-get install vsftpd
{% endhighlight %}

AWS console에서 ftp관련 포트 열어주기
![port open][2]
> `instance`에서 사용하는 Security Group의 inbound 규칙에 20~21, 1024~1048 port 추가


vsftp 설정하기
{% highlight bash %}
sudo vi /etc/vsftpd.conf
{% endhighlight %}

익명 사용자 접속 거부 되어 있는지 확인
anonymous_enable=NO

설정파일 마지막 줄에 다음 코드 추가
{% highlight bash %}
pasv_enable=YES
pasv_min_port=1024
pasv_max_port=1048
pasv_address=AWS instace IP (본인)
{% endhighlight %}

vsftp 재시작
{% highlight bash %}
sudo service vsftpd restart
{% endhighlight %}

필요시 유저 추가하여 (ftp 접속할) 사용


[1]: http://smc0210.github.io/assets/post/20180120-1-1.png
[2]: http://smc0210.github.io/assets/post/20180120-1-2.png
[2]: http://smc0210.github.io/assets/post/20180120-1-3.png

