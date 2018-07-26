
    /**
     * Verifica se IP percente a rede
     * @param string $network - rede que será verificada ex: (10.0.0.1/16)
     * @param string $ip - endereço ip que será verificado
     * @return boolean $result - retorna true se pertencer e false se não pertencer
     */
    private function belongs_to_network ($network, $ip) {

        $ip_verificado = $ip; // IP que será vefiricado
        $superNet = $network; // rede que será verificada ex: (10.0.0.1/16)
        $superNetMask = ''; // optional
        $maxSubNets = '2048'; // Stop memory leak from invalid input or large ranges
        $result = false;

        // Calculate supernet mask and cdr
        if (preg_match('~/~',$superNet)){  //if cidr type mask
            $charHost = inet_pton(strtok($superNet, '/'));
            $charMask = self::_cdr2Char(strtok('/'),strlen($charHost));


            // Single host mask used for hostmin and hostmax bitwise operations
            $charHostMask = substr(self::_cdr2Char(127),-strlen($charHost));

            $charWC = ~$charMask; // Supernet wildcard mask
            $charNet = $charHost & $charMask; // Supernet network address
            $charBcst = $charNet | ~$charMask; // Supernet broadcast
            $charHostMin = $charNet | ~$charHostMask; // Minimum host
            $charHostMax = $charBcst & $charHostMask; // Maximum host

            // Print Results
            // print 'Network :' . inet_ntop($charNet)."/".self::_char2Cdr($charMask)."<br>";
            // print 'Netmask :' . inet_ntop($charMask)." = /".self::_char2Cdr($charMask)."<br>";
            // print 'Wildcard :' . inet_ntop($charWC)."<br>";
            // print 'Broadcast :' . inet_ntop($charBcst)."<br>";
            // print 'HostMin :' . inet_ntop($charHostMin)."<br>";
            // print 'HostMax :' . inet_ntop($charHostMax)."<br><br>";

            $primeiro = inet_ntop($charHostMin); //primeiro ip da rede já existente
            $ultimo = inet_ntop($charHostMax); //ultimo ip da rede já existente

            // verifica se IP percente a rede
            if ((pack('N',ip2long($ip_verificado)) >= pack('N',ip2long($primeiro))) && (pack('N',ip2long($ip_verificado)) <= pack('N',ip2long($ultimo)))) {
                // echo "IP $ip_verificado pertence a rede $primeiro, que está na lista de exceções, nada a fazer!";
                $result = true;
            } else {
                // echo "IP $ip_verificado foi bloqueado!";
            }

        }

        return $result;
    }

     /* Funções auxiliares para verificação de IP e Rede */

    private function _cdr2Bin ($cdrin,$len=4){
        if ( $len > 4 || $cdrin > 32 ) { // Are we ipv6?
            return str_pad(str_pad("", $cdrin, "1"), 128, "0");
        } else {
          return str_pad(str_pad("", $cdrin, "1"), 32, "0");
        }
    }

    private function _bin2Cdr ($binin){
        return strlen(rtrim($binin,"0"));
    }

    private function _cdr2Char ($cdrin,$len=4){
        $hex = self::_bin2Hex(self::_cdr2Bin($cdrin,$len));
        return self::_hex2Char($hex);
    }

    private function _char2Cdr ($char){
        $bin = self::_hex2Bin(self::_char2Hex($char));
        return self::_bin2Cdr($bin);
    }

    private function _hex2Char($hex){
        return pack('H*',$hex);
    }

    private function _char2Hex($char){
        $hex = unpack('H*',$char);
        return array_pop($hex);
    }

    private function _hex2Bin($hex){
      $bin='';
      for($i=0;$i<strlen($hex);$i++)
        $bin.=str_pad(decbin(hexdec($hex{$i})),4,'0',STR_PAD_LEFT);
      return $bin;
    }

    private function _bin2Hex($bin){
      $hex='';
      for($i=strlen($bin)-4;$i>=0;$i-=4)
        $hex.=dechex(bindec(substr($bin,$i,4)));
      return strrev($hex);
    }