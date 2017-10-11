import {ReturnStatement} from 'estree';
import {types} from 'recast';
import {toRule} from '../../../RuleMapper';
import {CompletionRecord} from '../../domain/CompletionRecords';
import {getValue} from '../../rules/Others';
import {RuleExpression, trackOptimized} from '../../rules/RuleExpression';
import {inNewScope, RuleLetStatement} from '../../rules/RuleStatements';

export function ReturnStatement(node: ReturnStatement): RuleExpression<CompletionRecord> {
    const argument = node.argument ? trackOptimized(toRule(node.argument)) : null;
    return inNewScope(argument ? [
        new RuleLetStatement('ret', getValue(argument))
    ] : [], () => types.builders.returnStatement(argument ? argument.toExpression() : null)); // TODO
}
