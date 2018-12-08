package com.miracle.web.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.thymeleaf.context.IEngineContextFactory;
import org.thymeleaf.spring5.SpringTemplateEngine;
import org.thymeleaf.templateresolver.ITemplateResolver;

/*更新了thymeleaf到3.0.9版本之后发现浏览某些页面的时候，会爆出如下异常：
  org.thymeleaf.exceptions.TemplateProcessingException: Access to variable "param" is forbidden in this context. Note some restrictions apply to variable access. For example, direct access to request parameters is forbidden in preprocessing and unescaped expressions, in TEXT template mode, in fragment insertion specifications and in some specific attribute processors.
 看了下它的更新日志之后才发现，它一直都有一个restricted expression evaluation mode，这次更新影响到了src,href以及attr等属性，以前版本只对th:utext,th:replace,th:include等做限制(具体请见 thymeleaf #683)
 解决方案：https://www.qyh.me/space/java/article/thymeleaf-basic-usage
*/
@Configuration
@ComponentScan
public class FuckThymeleafConfig  {

    @Bean
    public SpringTemplateEngine templateEngine(ITemplateResolver templateResolver,IEngineContextFactory engineContextFactory){
        SpringTemplateEngine templateEngine = new SpringTemplateEngine();
        templateEngine.setTemplateResolver(templateResolver);
        templateEngine.setEngineContextFactory(engineContextFactory);
        templateEngine.setEnableSpringELCompiler(true);
        return templateEngine;
    }

    @Bean
    public IEngineContextFactory engineContextFactory(){
        return new FuckRestrictedContextFactory();
    }
}
