Riot.precompiledTags['elements/test-template.html'] = { tagName: 'test-template-from-url', html: '<div>template from URL</div>', css: '', attribs: '' }; 
Riot.precompiledTags['elements/timer.html'] = { tagName: 'timer', html: '<div> timer: <span class="bolded">{{time}} and {time}</span><br> trasclusion is \'<yield></yield>\'<br> <div each="{{el in mylist}}">iterating over array item "{{el}}"<br></div> <div>this is from timer.html file!</div> </div>', css: 'timer .bolded,[riot-tag="timer"] .bolded { font-weight: bolder; font-size: large; }', attribs: '' }; 
