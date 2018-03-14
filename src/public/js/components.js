function alertBootstrap(tipoAlert, mensagem) {
    var alertComponent = '<div class="alert ' + tipoAlert + '" role="alert">'
    alertComponent += mensagem;
    alertComponent += '<button type="button" class="close" data-dismiss="alert"'
    alertComponent += 'aria-label="Close">'
    alertComponent += '<span aria-hidden="true">&times;</span>'
    alertComponent += '</button></div>'
    return alertComponent
}