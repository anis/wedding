<!doctype html>
<html lang="fr">
    <head>
        <title>Anis &amp; Flo, Octobre 2016</title>
        <meta name="robots" content="noindex" />
        <link rel="icon" href="img/favicon.gif" type="image/gif">

        <!-- wedding:css -->
        <!-- endinject -->
    </head>

    <body>
        <div class="loader" id="loader"></div>

        <div class="background" id="background" data-img-width="1920" data-img-height="1080">
            <div class="content" id="content">
                <h1 class="content-title">Anis &amp; Flo</h1>
                <p class="content-subtitle">Se marient</p>
                <p><span class="content-strike"></span><i class="content-heart">&hearts;</i><span class="content-strike"></span></p>
                <p class="content-subtitle">22 Octobre 2016</p>
            </div>
        </div>

        <div class="countdown" id="countdown"><!--
            --><p class="countdown-item" id="months"></p><!--
            --><p class="countdown-item" id="days"></p><!--
            --><p class="countdown-item" id="hours"></p><!--
            --><p class="countdown-item" id="minutes"></p><!--
            --><p class="countdown-item" id="seconds"></p><!--
        --></div>

        <script type="text/javascript">
            var rel = Math.round(Date.now() / 1000),
                abs = <?php echo time(); ?>;
        </script>

        <!-- vendor:js -->
        <!-- endinject -->

        <!-- wedding:js -->
        <!-- endinject -->
    </body>
</html>